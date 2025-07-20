package site.gongnomok.api.global.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    private static final String START_TIME = "startTime";

    @Override
    public boolean preHandle(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler
    ) throws Exception {
        request.setAttribute(START_TIME, System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler, 
        Exception ex
    ) throws Exception {
        long startTime = (long) request.getAttribute(START_TIME);
        long duration = System.currentTimeMillis() - startTime;

        Map<String, Object> logging = new HashMap<>();
        logging.put("timestamp", Instant.now().toString());
        logging.put("method", request.getMethod());
        logging.put("uri", request.getRequestURI());
        logging.put("status", response.getStatus());
        logging.put("response_time_ms", duration);
        logging.put("remote_addr", request.getRemoteAddr());
        logging.put("log_type", "access");

        log.info(new ObjectMapper().writeValueAsString(logging));
    }
}
