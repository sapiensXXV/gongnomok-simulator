package site.gongnomok.api.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.enhanceditem.EnhancedItemService;
import site.gongnomok.core.management.log.RecordLogService;
import site.gongnomok.data.management.record.dto.response.RecordResponse;

import java.util.List;


@RestController
@RequestMapping("/api/manage")
@RequiredArgsConstructor
@Slf4j
public class RecordManagementController {

    private final RecordLogService recordLogService;
    private final EnhancedItemService enhancedItemService;

    // TODO: 다시 @AdminOnly 애노테이션 붙일 것.

    @GetMapping("/record/logs")
    @AdminOnly
    public ResponseEntity<List<RecordResponse>> itemRecords(
        @AdminAuth Accessor accessor,
        @RequestParam("lastId") long lastId,
        @RequestParam("size") long size,
        @RequestParam("name") String name
    ) {
//        log.info("lastId={}, size={}, name={}", lastId, size, name);
        List<RecordResponse> result = recordLogService.readRecordLog(lastId, size, name);
        return ResponseEntity.ok(result);
    }
    
    @PatchMapping("/record/logs")
    @AdminOnly
    public ResponseEntity<Void> replaceRecords(
        @AdminAuth Accessor accessor,
        @RequestBody final RecordReplaceRequest request
    ) {
//        log.info("request={}", request);
        enhancedItemService.replaceRecord(request);
        
        return ResponseEntity.ok(null);
    }

    @PostMapping("/record/refresh")
    @AdminOnly
    public ResponseEntity<Void> restoreRecordsWithLog(
        @AdminAuth Accessor accessor
        
    ) {
        return ResponseEntity.ok(null);
    }

    /**
     * 사용자의 이름을 기반으로 실제 기록과 로그를 삭제한다.
     * 
     * @param name 삭제할 기록의 유저의 이름
     * @return 200 OK
     */
    @DeleteMapping("/record/logs")
    @AdminOnly
    public ResponseEntity<Void> deleteRecord(@AdminAuth Accessor accessor, final String ip) {
        recordLogService.deleteRecord(ip);
        return ResponseEntity.ok(null);
    }
    
    @PostMapping("/record/clean")
    @AdminOnly
    public ResponseEntity<Void> cleanRecords(
        final @AdminAuth Accessor accessor) {
        recordLogService.clean();
        
        return ResponseEntity.ok().build();
    }
    
}
