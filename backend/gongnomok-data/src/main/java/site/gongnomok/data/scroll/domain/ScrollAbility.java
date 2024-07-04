package site.gongnomok.data.scroll.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ScrollAbility {

    @ColumnDefault("0")
    @Column(nullable = false)
    private int str;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int dex;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int intel;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int luk;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int phyAtk;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int mgAtk;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int phyDef;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int mgDef;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int acc;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int avo;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int move;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int jump;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int hp;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int mp;

}
