package site.gongnomok.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import site.gongnomok.data.GongnomokDataApplication;

@SpringBootApplication(
    scanBasePackageClasses = {
        GongnomokCoreApplication.class,
        GongnomokDataApplication.class
    }
)
public class GongnomokCoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(GongnomokCoreApplication.class, args);
    }

}
