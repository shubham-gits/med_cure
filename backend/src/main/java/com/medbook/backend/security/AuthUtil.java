package com.medbook.backend.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class AuthUtil {

    private AuthUtil() {}

    public static String currentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return null;
        return (String) auth.getPrincipal();
    }

    /** Returns "admin" | "doctor" | "patient" (lowercase), or null if unauthenticated. */
    public static String currentRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getAuthorities().isEmpty()) return null;
        String authority = auth.getAuthorities().iterator().next().getAuthority(); // "ROLE_DOCTOR"
        return authority.replace("ROLE_", "").toLowerCase();
    }
}
