package site.gongnomok.api.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import site.gongnomok.api.global.interceptor.IpAccessInterceptor;
import site.gongnomok.api.global.interceptor.LoggingInterceptor;


@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final IpAccessInterceptor ipAccessInterceptor;
    private final LoggingInterceptor loggingInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(ipAccessInterceptor)
            .addPathPatterns("/**");
//        registry.addInterceptor(loggingInterceptor)
//            .addPathPatterns("/**");
    }
}
