package site.gongnomok.core.management.log;

import org.springframework.stereotype.Component;
import site.gongnomok.data.enhanceditem.domain.EnhanceStatus;
import site.gongnomok.data.enhanceditem.domain.EnhanceSuccess;
import site.gongnomok.data.log.enahncerecord.domain.EnhanceRecordStatus;
import site.gongnomok.data.log.enahncerecord.domain.EnhanceRecordSuccess;

@Component
public class RecordEntityConverter {
    
    public EnhanceRecordSuccess fromEntitySuccess(EnhanceSuccess success) {
        return EnhanceRecordSuccess.builder()
            .ten(success.getTenSuccessCount())
            .sixty(success.getSixtySuccessCount())
            .hundred(success.getHundredSuccessCount())
            .build();
    } 
    
    public EnhanceRecordStatus fromEntityStatus(EnhanceStatus status) {
        return EnhanceRecordStatus.builder()
            .str(status.getStr())
            .dex(status.getDex())
            .intel(status.getIntel())
            .luk(status.getLuk())
            .phyAtk(status.getPhyAtk())
            .phyDef(status.getPhyDef())
            .mgAtk(status.getMgAtk())
            .mgDef(status.getMgDef())
            .avo(status.getAvo())
            .acc(status.getAcc())
            .move(status.getMove())
            .jump(status.getJump())
            .hp(status.getHp())
            .mp(status.getMp())
            .build();
    }
    
}
