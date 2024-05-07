package site.gongnomok.item.dto.request.itemlist;


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
}
