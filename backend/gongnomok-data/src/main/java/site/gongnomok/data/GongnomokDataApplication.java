package site.gongnomok.data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@ComponentScan(
    basePackages = {
        "site.gongnomok.common",
        "site.gongnomok.data"
    }
)
@EnableJpaAuditing
public class GongnomokDataApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokDataApplication.class, args);
    }

}
