package site.gongnomok.data.management.record.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
@Builder
@Embeddable
public class EnhanceRecordStatus {
    @Column(nullable = false)
    private int str;

    @Column(nullable = false)
    private int dex;

    @Column(nullable = false)
    private int intel;

    @Column(nullable = false)
    private int luk;

    @Column(nullable = false)
    private int phyAtk;

    @Column(nullable = false)
    private int mgAtk;

    @Column(nullable = false)
    private int phyDef;

    @Column(nullable = false)
    private int mgDef;

    @Column(nullable = false)
    private int acc;

    @Column(nullable = false)
    private int avo;

    @Column(nullable = false)
    private int move;

    @Column(nullable = false)
    private int jump;

    @Column(nullable = false)
    private int hp;

    @Column(nullable = false)
    private int mp;

}
