package site.gongnomok.domain.comment.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.comment.dto.*;
import site.gongnomok.domain.comment.exception.CannotFindCommentByIdException;
import site.gongnomok.domain.comment.exception.CommentPasswordNotMatchException;
import site.gongnomok.global.entity.Comment;
import site.gongnomok.global.util.SecurityUtil;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    CommentService commentService;

    @Test
    @DisplayName("댓글 생성")
    public void createCommentTest() {

        String USERNAME = "test username";
        String PASSWORD = SecurityUtil.encryptSha256("test password");
        String CONTENT = "test comment content";
        Long ITEM_ID = 5L;

        //given
        String encryptedPassword = SecurityUtil.encryptSha256("test password");
        CommentCreateServiceDto createDto = CommentCreateServiceDto.builder()
            .name(USERNAME)
            .password(PASSWORD)
            .content(CONTENT)
            .build();

        //when
        CommentCreateResponse createResponse = commentService.createComment(createDto, ITEM_ID);

        //then
        assertThat(createResponse.getCommentId()).isNotNull();
        assertThat(createResponse.getName()).isEqualTo(USERNAME);
        assertThat(createResponse.getCreatedDate()).isNotNull();
    }

    @Test
    @DisplayName("아이템 댓글 첫페이지 No Offset")
    void comment_no_offset_first_page() {
        Long itemId = 5L;
        for (int i = 1; i <= 30; i++) {
            commentService.createComment(
                CommentCreateServiceDto.builder()
                    .name("abc" + i)
                    .password("password")
                    .content("testcomment" + i)
                    .build(),
                itemId
            );
        }

        List<CommentResponse> results = commentService.fetchComment(itemId, null, 20);

        assertThat(results).hasSize(20);
    }

    @Test
    @DisplayName("아이템 댓글 No Offset")
    @Transactional
    void comment_no_offset_page() {
        Long itemId = 5L;
        for (int i = 1; i <= 30; i++) {
            commentService.createComment(
                CommentCreateServiceDto.builder()
                    .name("abc" + i)
                    .password("password")
                    .content("test content")
                    .build(),
                itemId
            );
        }
        // 마지막으로 등록한 댓글 1개를 가져옴
        List<CommentResponse> commentFirstPage = commentService.fetchComment(itemId, null, 1);
        Long lastCommentId = commentFirstPage.get(0).getCommentId();

        List<CommentResponse> results = commentService.fetchComment(itemId, lastCommentId, 20);

        assertThat(results).hasSize(20);
    }


    @Test
    @DisplayName("댓글 삭제 성공")
    void comment_delete() {

        //given
        String PASSWORD = "1234321";
        Long itemId = 5L;

        CommentCreateServiceDto createDto = CommentCreateServiceDto.builder()
            .name("user")
            .password(PASSWORD)
            .content("comment content")
            .build();
        CommentCreateResponse createCommentInfo = commentService.createComment(createDto, 5L);

        //when
        CommentDeleteServiceDto deleteDto = CommentDeleteServiceDto.builder()
            .commentId(createCommentInfo.getCommentId())
            .password(PASSWORD)
            .build();

        commentService.deleteComment(deleteDto);
    }

    @Test
    @DisplayName("댓글 비밀번호 불일치 삭제 실패")
    void comment_delete_fail_password_mismatch() {
        //given
        String PASSWORD = "1234321";
        String WRONG_PASSWORD = "1234";

        CommentCreateServiceDto createDto = CommentCreateServiceDto.builder()
            .name("user")
            .password(PASSWORD)
            .content("comment content")
            .build();

        CommentCreateResponse createCommentInfo = commentService.createComment(createDto, 5L);

        //when, then
        CommentDeleteServiceDto deleteDto = CommentDeleteServiceDto.builder()
            .commentId(createCommentInfo.getCommentId())
            .password(WRONG_PASSWORD)
            .build();

        assertThrows(CommentPasswordNotMatchException.class, () -> {
            commentService.deleteComment(deleteDto);
        });
    }

    @Test
    @DisplayName("댓글 ID 불일치 삭제 실패")
    void comment_delete_fail_comment_id_mismatch() {
        CommentDeleteServiceDto deleteDto = CommentDeleteServiceDto.builder()
            .commentId(Long.MAX_VALUE)
            .password("password")
            .build();

        assertThrows(CannotFindCommentByIdException.class, () -> {
            commentService.deleteComment(deleteDto);
        });
    }

}