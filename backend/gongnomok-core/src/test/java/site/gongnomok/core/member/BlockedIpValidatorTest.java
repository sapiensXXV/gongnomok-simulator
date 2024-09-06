package site.gongnomok.core.member;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThatThrownBy;


@SpringBootTest
class BlockedIpValidatorTest {
    
    @Autowired
    BlockedIpValidator blockedIpValidator;
    
    @Test
    @DisplayName("IP 주소검증 테스트")
    void ipValidateTest() {
        String rightIp = "192.1.1.1";
        String wrongIp = "1.1.1";

        blockedIpValidator.validate(rightIp);
        assertThatThrownBy(() -> blockedIpValidator.validate(wrongIp))
            .isInstanceOf(IllegalArgumentException.class);
    }
    

}