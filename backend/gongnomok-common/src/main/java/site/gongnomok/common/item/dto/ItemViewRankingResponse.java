package site.gongnomok.common.item.dto;

import lombok.Getter;


@Getter
public class ItemViewRankingResponse {

    private Long itemId;
    private String name;
    private int viewCount;
    private int rank;

    private ItemViewRankingResponse() {
    }

    private ItemViewRankingResponse(Long itemId, String name, int viewCount, int rank) {
        this.itemId = itemId;
        this.name = name;
        this.viewCount = viewCount;
        this.rank = rank;
    }

    public static ItemViewRankingResponse of(Long itemId, String name, int viewCount, int rank) {
        return new ItemViewRankingResponse(itemId, name, viewCount, rank);
    }

}
