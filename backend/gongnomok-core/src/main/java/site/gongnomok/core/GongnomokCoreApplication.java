package site.gongnomok.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(
    scanBasePackages = {
        "site.gongnomok.core",
        "site.gongnomok.data",
        "site.gongnomok.common"
    }
)
@EnableScheduling
public class GongnomokCoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokCoreApplication.class, args);
    }

}
