package site.gongnomok.domain.comment.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.comment.dto.response.CommentCreateResponse;
import site.gongnomok.comment.dto.request.CommentCreateServiceDto;
import site.gongnomok.comment.dto.request.CommentDeleteServiceDto;
import site.gongnomok.comment.service.CommentService;
import site.gongnomok.global.exception.CommentException;
import site.gongnomok.global.util.SecurityUtil;
import site.gongnomok.item.domain.AttackSpeed;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.request.ItemCreateRequest;
import site.gongnomok.item.dto.request.ItemStatusRequest;
import site.gongnomok.item.service.ItemService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    CommentService commentService;

    @Autowired
    ItemService itemService;

    @BeforeEach
    void beforeEach() {

        final String ITEM_NAME_PREFIX = "item_";

        for (long i = 1; i <= 30; i++) {
            final Long ITEM_ID = i;
            final String ITEM_NAME = ITEM_NAME_PREFIX + i;

            final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
            final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
            final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

            ItemCreateRequest createRequest = ItemCreateRequest.builder()
                .id(ITEM_ID)
                .name(ITEM_NAME)
                .requiredJob(requiredJob)
                .required(requiredDto)
                .category(Category.CLAW.name())
                .status(status)
                .upgradableCount(7)
                .attackSpeed(AttackSpeed.FAST.name())
                .knockBackPercent(0)
                .build();
            itemService.createItem(createRequest);
        }
    }

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

        assertThrows(CommentException.class, () -> {
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

        assertThrows(CommentException.class, () -> {
            commentService.deleteComment(deleteDto);
        });
    }

}