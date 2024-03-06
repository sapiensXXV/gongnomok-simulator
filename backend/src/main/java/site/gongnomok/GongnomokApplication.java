package site.gongnomok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GongnomokApplication {

	public static void main(String[] args) {
		SpringApplication.run(GongnomokApplication.class, args);
	}

}
