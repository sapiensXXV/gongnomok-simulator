package site.gongnomok.data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(
    basePackages = {
        "site.gongnomok.common",
        "site.gongnomok.data"
    }
)
public class GongnomokDataApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokDataApplication.class, args);
    }

}
