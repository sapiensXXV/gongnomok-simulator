package site.gongnomok.comment.presentation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.comment.dto.request.CommentCreateDto;
import site.gongnomok.comment.dto.request.CommentDeleteDto;
import site.gongnomok.comment.dto.request.CommentReportDto;
import site.gongnomok.comment.dto.response.CommentCountResponse;
import site.gongnomok.comment.dto.response.CommentCreateResponse;
import site.gongnomok.comment.dto.response.CommentResponse;
import site.gongnomok.comment.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/item/{itemId}/comment")
    public ResponseEntity<CommentCreateResponse> createComment(
        @PathVariable(name = "itemId") Long itemId,
        @RequestBody CommentCreateDto requestDto
    ) {
        CommentCreateResponse createdComment = commentService.createComment(requestDto.toServiceDto(), itemId);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(createdComment);
    }

    @GetMapping("/item/{itemId}/comment/count")
    public ResponseEntity<CommentCountResponse> countComment(
        @PathVariable("itemId") Long itemId
    ) {
        return ResponseEntity.ok(commentService.countComment(itemId));
    }

    @GetMapping("/item/{itemId}/comment")
    public ResponseEntity<List<CommentResponse>> comment(
        @PathVariable(name = "itemId") Long itemId,
        @RequestParam("lastId") Long lastId,
        @RequestParam("size") int size
    ) {

        List<CommentResponse> comments = commentService.fetchComment(itemId, lastId == -1 ? null : lastId, size);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/item/comment/delete")
    public ResponseEntity<Void> deleteComment(
        @RequestBody CommentDeleteDto deleteDto
    ) {

        commentService.deleteComment(deleteDto.toServiceDto());
        return ResponseEntity.ok().build();
    }

    /**
     * 댓글신고
     */
    @PostMapping("/item/comment/report")
    public ResponseEntity<Void> reportComment(
        @RequestBody CommentReportDto reportDto
    ) {
        commentService.reportComment(reportDto.getCommentId());
        return ResponseEntity.noContent().build();
    }

}
