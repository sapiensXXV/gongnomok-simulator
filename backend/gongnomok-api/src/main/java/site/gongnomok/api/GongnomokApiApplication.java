package site.gongnomok.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {
    "site.gongnomok.api",
    "site.gongnomok.core",
    "site.gongnomok.data"
})
@EnableScheduling
public class GongnomokApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokApiApplication.class, args);
    }

}
