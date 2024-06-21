package site.gongnomok.item.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequiredStatus {
    private int requiredLevel;
    private int requiredStr;
    private int requiredDex;
    private int requiredInt;
    private int requiredLuk;
    private int requiredPop;
}
