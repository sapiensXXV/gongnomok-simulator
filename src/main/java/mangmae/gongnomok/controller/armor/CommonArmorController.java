package mangmae.gongnomok.controller.armor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/armor")
public class CommonArmorController {

    // 노가다 목장갑
    @GetMapping("/work-glove")
    public String workGlove() {
        return "item/armor/work-glove";
    }

    // 파란색 가운
    @GetMapping("/blue-robe-select")
    public String blueRobeSelect() {
        return "item/armor/blue-robe/blue-robe-select";
    }

    // 파란색 가운(민첩)
    @GetMapping("/blue-robe-dex")
    public String blueRobeDex() {
        return "item/armor/blue-robe/blue-robe-dex";
    }

    // 파란색 가운(행운)
    @GetMapping("/blue-robe-luk")
    public String blueRobeLuk() {
        return "item/armor/blue-robe/blue-robe-luk";
    }

    // 파란색 가운(지능)
    @GetMapping("/blue-robe-int")
    public String blueRobeInt() {
        return "item/armor/blue-robe/blue-robe-int";
    }

    // 허름한 망토
    @GetMapping("/raggedy-cape-select")
    public String raggedyCapeSelect() {
        return "item/armor/raggedy-cape/raggedy-cape-select";
    }

    // 허름한 망토(힘)
    @GetMapping("/raggedy-cape-str")
    public String raggedyCapeStr() {
        return "item/armor/raggedy-cape/raggedy-cape-str";
    }

    // 허름한 망토(민첩)
    @GetMapping("/raggedy-cape-dex")
    public String raggedyCapeDex() {
        return "item/armor/raggedy-cape/raggedy-cape-dex";
    }

    // 허름한 망토(지력)
    @GetMapping("/raggedy-cape-int")
    public String raggedyCapeInt() {
        return "item/armor/raggedy-cape/raggedy-cape-int";
    }

    // 허름한 망토(행운)
    @GetMapping("/raggedy-cape-luk")
    public String raggedyCapeLuk() {
        return "item/armor/raggedy-cape/raggedy-cape-luk";
    }

    // 이카루스의 망토
    @GetMapping("/icarus-cape-str")
    public String icarusCape() {
        return "item/armor/icarus-cape/icarus-cape-strong";
    }

    // 빨간색 가이아의 망토
    @GetMapping("/red-gaia-cape")
    public String redGaiaCapeSelect() {
        return "item/armor/red-gaia-cape/red-gaia-cape";
    }

    @GetMapping("/red-gaia-cape-str")
    public String redGaiaCapeStrong() {
        return "item/armor/red-gaia-cape/red-gaia-cape-strong";
    }

    @GetMapping("/red-gaia-cape-dex")
    public String redGaiaCapeSwift() {
        return "item/armor/red-gaia-cape/red-gaia-cape-swift";
    }

    @GetMapping("/red-gaia-cape-int")
    public String redGaiaCapeIntel() {
        return "item/armor/red-gaia-cape/red-gaia-cape-intel";
    }

    @GetMapping("/red-gaia-cape-luk")
    public String redGaiaCapeLucky() {
        return "item/armor/red-gaia-cape/red-gaia-cape-lucky";
    }
}
