package site.gongnomok.common.item.dto.request.itemlist;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class JobSearchDto {

    private boolean warrior;
    private boolean bowman;
    private boolean magician;
    private boolean thief;

    public boolean isWarrior() {
        return warrior;
    }

    public boolean isBowman() {
        return bowman;
    }

    public boolean isMagician() {
        return magician;
    }

    public boolean isThief() {
        return thief;
    }

    public boolean isAll() {
        return !isWarrior() && !isBowman() && !isMagician() && !isThief();
    }

    public static JobSearchDto allFalse() {
        return new JobSearchDto(false, false, false, false);
    }

    public static JobSearchDto allTrue() {
        return new JobSearchDto(true, true, true, true);
    }
}
