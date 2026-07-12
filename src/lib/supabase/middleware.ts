import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { canAccessAdminRoute } from "@/lib/admin-permissions";

function redirectToAdminLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  return NextResponse.redirect(url);
}

function redirectToUnauthorized(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("error", "unauthorized");
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set({ name, value, ...options })
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin/login"
  ) {
    if (!user) {
      return redirectToAdminLogin(request);
    }

    const { data: staff } = await supabase
      .from("staff")
      .select("id, role, status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!staff || staff.role === "Customer") {
      return redirectToAdminLogin(request);
    }

    const { data: rolePermissions } = await supabase
      .from("role_permissions")
      .select("permissions(name)")
      .eq("role", staff.role);

    const permissionNames =
      rolePermissions
        ?.map((rolePermission: any) => rolePermission.permissions?.name)
        .filter(Boolean) ?? [];

    const hasAccess = canAccessAdminRoute({
      pathname: request.nextUrl.pathname,
      role: staff.role,
      permissions: permissionNames,
    });

    if (!hasAccess) {
      return redirectToUnauthorized(request);
    }
  }

  return supabaseResponse;
}
