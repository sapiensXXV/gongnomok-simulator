package site.gongnomok.core.auth;


import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import site.gongnomok.common.exception.AdminException;
import site.gongnomok.common.exception.ExceptionCode;
import site.gongnomok.core.auth.domain.Accessor;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class AdminOnlyChecker {

    @Before("@annotation(site.gongnomok.core.auth.AdminOnly)")
    public void check(JoinPoint joinPoint) {
        Arrays.stream(joinPoint.getArgs())
            .filter(Accessor.class::isInstance)
            .map(Accessor.class::cast)
            .filter(Accessor::isAdmin)
            .findFirst()
            .orElseThrow(() -> new AdminException(ExceptionCode.INVALID_ADMIN_AUTHORITY));
    }

}
