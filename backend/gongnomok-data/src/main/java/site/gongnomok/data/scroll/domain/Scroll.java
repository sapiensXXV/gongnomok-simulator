package site.gongnomok.data.scroll.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Scroll {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scroll_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int probability;

    @Embedded
    @Column(nullable = false)
    private ScrollAbility ability;
}
