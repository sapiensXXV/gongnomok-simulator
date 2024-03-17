package site.gongnomok.item.dto;

import lombok.Getter;


@Getter
public class ItemRankingResponse {

    private Long itemId;
    private String name;
    private int viewCount;
    private int rank;

    private ItemRankingResponse() {
    }

    private ItemRankingResponse(Long itemId, String name, int viewCount, int rank) {
        this.itemId = itemId;
        this.name = name;
        this.viewCount = viewCount;
        this.rank = rank;
    }

    public static ItemRankingResponse of(Long itemId, String name, int viewCount, int rank) {
        return new ItemRankingResponse(itemId, name, viewCount, rank);
    }

}
