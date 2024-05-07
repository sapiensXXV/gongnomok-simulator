package site.gongnomok.item.domain;


import site.gongnomok.item.dto.request.ItemCreateRequest;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.request.ItemStatusRequest;


public class ItemFactory {

    private ItemFactory() {
    }

    public static Item from(ItemCreateRequest dto) {
        Long itemId = dto.getId();
        String itemName = dto.getName();
        ItemRequiredJob requiredJob = dto.getRequiredJob();
        ItemRequiredDto required = dto.getRequired();
        Category category = Category.parseFrom(dto.getCategory());
        ItemStatusRequest status = dto.getStatus();
        int upgradableCount = dto.getUpgradableCount();
        AttackSpeed attackSpeed = AttackSpeed.stringToAttackSpeed(dto.getAttackSpeed());
        int knockBackPercent = dto.getKnockBackPercent();

        return Item.builder()
            .id(itemId)
            .name(itemName)
            .availableJob(requiredJob.toEntity())
            .requiredStatus(required.toEntity())
            .category(category)
            .attackSpeed(attackSpeed)
            .status(status.toEntity())
            .upgradable(upgradableCount)
            .knockBackPercent(knockBackPercent)
            .build();
    }
}
