package site.gongnomok.auth;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import site.gongnomok.auth.domain.Accessor;
import site.gongnomok.global.exception.AdminException;

import java.util.Arrays;

import static site.gongnomok.global.exception.ExceptionCode.INVALID_ADMIN_AUTHORITY;

@Aspect
@Component
public class AdminOnlyChecker {

    @Before("@annotation(site.gongnomok.auth.AdminOnly)")
    public void check(JoinPoint joinPoint) {
        Arrays.stream(joinPoint.getArgs())
            .filter(Accessor.class::isInstance)
            .map(Accessor.class::cast)
            .filter(Accessor::isAdmin)
            .findFirst()
            .orElseThrow(() -> new AdminException(INVALID_ADMIN_AUTHORITY));
    }

}
