package site.gongnomok.api.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import site.gongnomok.core.block.storage.BlockedIpStorage;


@Component
@RequiredArgsConstructor
@Slf4j
public class IpAccessInterceptor implements HandlerInterceptor {

//    public static Set<String> blackList = new HashSet<>(List.of("35.216.60.60", "1.229.57.160", "118.221.17.198"));

    private final BlockedIpStorage blockedIpStorage;
    
    @Override
    public boolean preHandle(
        final HttpServletRequest request,
        final HttpServletResponse response, 
        final Object handler
    ) throws Exception {

        String xForwardedFor = request.getHeader("X-Forwarded-For");
        String xRealIP = request.getHeader("X-Real-IP");
//        log.info("X-Forwarded-For: {}, X-Real-IP: {}", xForwardedFor, xRealIP);
        if (xRealIP != null && blockedIpStorage.contains(xRealIP)) {
            log.warn("블랙리스트 사용자 접근 - IP Address: {}", xRealIP);
            response.sendError(403);
            return false;
        }

        return true;
    }
}
