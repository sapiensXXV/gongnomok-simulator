package site.gongnomok.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import site.gongnomok.auth.AdminAuth;
import site.gongnomok.auth.domain.Accessor;
import site.gongnomok.global.constant.MemberConst;
import site.gongnomok.member.domain.Member;
import site.gongnomok.member.domain.Role;
import site.gongnomok.member.domain.repository.MemberRepository;


@Component
@RequiredArgsConstructor
public class AdminLoginArgumentResolver implements HandlerMethodArgumentResolver {

    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AdminAuth.class);
    }

    @Override
    public Object resolveArgument(
        MethodParameter parameter,
        ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest,
        WebDataBinderFactory binderFactory
    ) throws Exception {

        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(MemberConst.loginMember);

        if (member == null || !member.getRole().equals(Role.ADMIN)) {
            return null;
        }

        return Accessor.admin(member.getMemberId());
    }

}
