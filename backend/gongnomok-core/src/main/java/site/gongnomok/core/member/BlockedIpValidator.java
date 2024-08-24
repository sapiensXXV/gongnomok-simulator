package site.gongnomok.core.member;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BlockedIpValidator {
    
    public void validate(final String ip) {
        validateFormat(ip);
    }
    
    private void validateFormat(final String ip) {
        String ipv4Pattern = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

        String ipv6Pattern = "([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})";
        
        if (!ip.matches(ipv4Pattern) || !ipv6Pattern.matches(ip)) {
            throw new IllegalArgumentException("IP주소 형식이 아닙니다.");
        }
    }
    
}
