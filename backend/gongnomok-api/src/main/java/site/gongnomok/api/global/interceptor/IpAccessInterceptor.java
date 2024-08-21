package site.gongnomok.api.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Component
@RequiredArgsConstructor
@Slf4j
public class IpAccessInterceptor implements HandlerInterceptor {

    public static Set<String> blackList = new HashSet<>(List.of("35.216.60.60"));
    
    @Override
    public boolean preHandle(
        final HttpServletRequest request,
        final HttpServletResponse response, 
        final Object handler
    ) throws Exception {

        String clientIp = request.getHeader("X-Forwarded-For");
        log.info("client ip = {}", clientIp);
        if (blackList.contains(clientIp)) {
            log.warn("블랙리스트 사용자 접근 - IP Address: {}", clientIp);
            response.sendError(403);
            return false;
        }

        return true;
    }
}
