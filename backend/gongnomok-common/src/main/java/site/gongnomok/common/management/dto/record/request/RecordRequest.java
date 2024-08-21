package site.gongnomok.common.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 기록 데이터 요청시 사용되는 DTO
 */
@Getter
@AllArgsConstructor
public class RecordRequest {
    private long startId;
    private long size;
    private String itemName;
}
