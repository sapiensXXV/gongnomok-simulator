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

    // 파란색 가운(민첩)
    @GetMapping("/armor/blue-robe-dex")
    public String blueRobeDex() {
        return "item/armor/blue-robe-dex";
    }

    // 파란색 가운(행운)
    @GetMapping("/armor/blue-robe-luk")
    public String blueRobeLuk() {
        return "item/armor/blue-robe-luk";
    }

    // 파란색 가운(지능)
    @GetMapping("/armor/blue-robe-int")
    public String blueRobeInt() {
        return "item/armor/blue-robe-int";
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

    // 허름한 망토(힘)
    @GetMapping("/armor/raggedy-cape-str")
    public String raggedyCapeStr() {
        return "item/armor/raggedy-cape-str";
    }

    // 허름한 망토(민첩)
    @GetMapping("/armor/raggedy-cape-dex")
    public String raggedyCapeDex() {
        return "item/armor/raggedy-cape-dex";
    }

    // 허름한 망토(지력)
    @GetMapping("/armor/raggedy-cape-int")
    public String raggedyCapeInt() {
        return "item/armor/raggedy-cape-int";
    }

    // 허름한 망토(행운)
    @GetMapping("/armor/raggedy-cape-luk")
    public String raggedyCapeLuk() {
        return "item/armor/raggedy-cape-luk";
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

    //구룡도
    @GetMapping("/weapon/nine-dragon")
    public String nineDragon() {
        return "item/weapon/nine-dragon";
    }

}
