package site.gongnomok.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "site.gongnomok.api",
    "site.gongnomok.core",
    "site.gongnomok.data"
})
public class GongnomokApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokApiApplication.class, args);
    }

}
