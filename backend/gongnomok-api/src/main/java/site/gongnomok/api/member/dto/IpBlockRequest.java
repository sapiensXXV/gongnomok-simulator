package site.gongnomok.api.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class IpBlockRequest {
    
    private String ip;
    private String description;
    
}
