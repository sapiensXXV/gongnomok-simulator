package site.gongnomok.item.domain;


import org.springframework.stereotype.Component;
import site.gongnomok.item.dto.api.ItemCreateDto;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.request.ItemStatusRequest;


public class ItemFactory {

    private ItemFactory() {
    }

    public static Item from(ItemCreateDto dto) {
        Long itemId = dto.getId();
        String itemName = dto.getName();
        ItemRequiredJob requiredJob = dto.getRequiredJob();
        ItemRequiredDto required = dto.getRequired();
        Category category = Category.stringToCategory(dto.getCategory());
        ItemStatusRequest status = dto.getStatus();
        int upgradableCount = dto.getUpgradableCount();
        AttackSpeed attackSpeed = AttackSpeed.stringToAttackSpeed(dto.getAttackSpeed());
        int knockBackPercent = dto.getKnockBackPercent();

        Item newItem = Item.builder()
            .id(itemId)
            .name(itemName)
            .requiredLevel(required.getLevel())
            .requiredStr(required.getStr())
            .requiredDex(required.getDex())
            .requiredInt(required.getIntel())
            .requiredLuk(required.getLuk())
            .requiredPop(required.getPop())
            .common(requiredJob.isCommon())
            .warrior(requiredJob.isWarrior())
            .bowman(requiredJob.isBowman())
            .magician(requiredJob.isMagician())
            .thief(requiredJob.isThief())
            .category(category)
            .attackSpeed(attackSpeed)
            .status(status.toEntity())
            .upgradable(upgradableCount)
            .knockBackPercent(knockBackPercent)
            .build();
    }
}
