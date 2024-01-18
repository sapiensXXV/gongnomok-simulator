package mangmae.gongnomok;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
@Controller
public class ItemController {

    // 노가다 목장갑
    @GetMapping("/armor/work-glove")
    public String workGlove() {
        return "item/armor/work-glove";
    }

    // 파란색 가운
    @GetMapping("/armor/blue-robe-select")
    public String blueRobeSelect() {
        return "item/armor/blue-robe/blue-robe-select";
    }

    // 파란색 가운(민첩)
    @GetMapping("/armor/blue-robe-dex")
    public String blueRobeDex() {
        return "item/armor/blue-robe/blue-robe-dex";
    }

    // 파란색 가운(행운)
    @GetMapping("/armor/blue-robe-luk")
    public String blueRobeLuk() {
        return "item/armor/blue-robe/blue-robe-luk";
    }

    // 파란색 가운(지능)
    @GetMapping("/armor/blue-robe-int")
    public String blueRobeInt() {
        return "item/armor/blue-robe/blue-robe-int";
    }

    // 허름한 망토
    @GetMapping("/armor/raggedy-cape-select")
    public String raggedyCapeSelect() {
        return "item/armor/raggedy-cape/raggedy-cape-select";
    }

    // 허름한 망토(힘)
    @GetMapping("/armor/raggedy-cape-str")
    public String raggedyCapeStr() {
        return "item/armor/raggedy-cape/raggedy-cape-str";
    }

    // 허름한 망토(민첩)
    @GetMapping("/armor/raggedy-cape-dex")
    public String raggedyCapeDex() {
        return "item/armor/raggedy-cape/raggedy-cape-dex";
    }

    // 허름한 망토(지력)
    @GetMapping("/armor/raggedy-cape-int")
    public String raggedyCapeInt() {
        return "item/armor/raggedy-cape/raggedy-cape-int";
    }

    // 허름한 망토(행운)
    @GetMapping("/armor/raggedy-cape-luk")
    public String raggedyCapeLuk() {
        return "item/armor/raggedy-cape/raggedy-cape-luk";
    }

    // 다크세라피스
    @GetMapping("/armor/dark-seraphis")
    public String darkSeraphis() {
        return "item/armor/dark-seraphis/dark-seraphis";
    }

    // 다크 아나카문
    @GetMapping("/armor/dark-anakamoon")
    public String darkAnakamoon() {
        return "item/armor/dark-anakamoon/dark-anakamoon";
    }

    //메바
    @GetMapping("/weapon/meba")
    public String meba() {
        return "item/weapon/meba";
    }

    // 다크 보닌
    @GetMapping("/weapon/dark-avarice")
    public String darkAvarice() {
        return "item/weapon/dark-avarice";
    }

    // 블러드 기간틱
    @GetMapping("/weapon/blood-gigantic")
    public String bloodGigantic() {
        return "item/weapon/blood-gigantic";
    }

    // 황갑충
    @GetMapping("/weapon/brown-scarab")
    public String brownScarab() {
        return "item/weapon/brown-scarab";
    }

    //우드완드
    @GetMapping("/weapon/wooden-wand")
    public String woodenWand() {
        return "item/weapon/wooden-wand";
    }

    // 아크 스태프
    @GetMapping("/weapon/arc-staff")
    public String arcStaff() {
        return "item/weapon/arc-staff";
    }

    // 이블 윙즈
    @GetMapping("/weapon/evil-wings")
    public String evilWings() {
        return "item/weapon/evil-wings";
    }

    //하이랜더
    @GetMapping("/weapon/lion-heart")
    public String lionHeart() {
        return "item/weapon/lion-heart";
    }

    //호검
    @GetMapping("/weapon/lion-fang")
    public String lionFang() {
        return "item/weapon/lion-fang";
    }
    //나카마키
    @GetMapping("/weapon/nakamaki")
    public String nakamaki() {
        return "item/weapon/nakamaki";
    }

    //zeco
    @GetMapping("/weapon/zeco-select")
    public String zeco() {
        return "item/weapon/zeco/zeco-select";
    }

    @GetMapping("/weapon/zeco-accurate")
    public String zecoSwift() {
        return "item/weapon/zeco/zeco-accurate";
    }

    @GetMapping("/weapon/zeco-strong")
    public String zecoStrong() {
        return "item/weapon/zeco/zeco-strong";
    }

    //구룡도
    @GetMapping("/weapon/nine-dragon")
    public String nineDragon() {
        return "item/weapon/nine-dragon";
    }

    /**
     * 장신구
     */
    //홀리 크로스링
    @GetMapping("/accessory/holy-cross-earring")
    public String holyCrossRing() {
        return "item/accessory/holy-cross-earring-select";
    }

    @GetMapping("/accessory/holy-cross-earring-health")
    public String holyCrossRingHealth() {
        return "item/accessory/holy-cross-earring-hp";
    }

    @GetMapping("/accessory/holy-cross-earring-swift")
    public String holyCrossRingSwift() {
        return "item/accessory/holy-cross-earring-dex";
    }

    @GetMapping("/accessory/holy-cross-earring-intel")
    public String holyCrossRingIntel() {
        return "item/accessory/holy-cross-earring-int";
    }

    @GetMapping("/accessory/holy-cross-earring-lucky")
    public String holyCrossRingLucky() {
        return "item/accessory/holy-cross-earring-luk";
    }
}
