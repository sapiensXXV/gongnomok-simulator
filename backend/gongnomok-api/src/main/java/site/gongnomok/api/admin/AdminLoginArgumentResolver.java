package site.gongnomok.api.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import site.gongnomok.common.member.constant.MemberConst;
import site.gongnomok.common.member.dto.request.MemberDto;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.data.member.Role;


@Component
@RequiredArgsConstructor
public class AdminLoginArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AdminAuth.class);
    }

    @Override
    public Accessor resolveArgument(
        MethodParameter parameter,
        ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest,
        WebDataBinderFactory binderFactory
    ) throws Exception {

        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        HttpSession session = request.getSession();
        MemberDto member = (MemberDto) session.getAttribute(MemberConst.loginMember);

        if (member == null || !member.getRole().equals(Role.ADMIN.name())) {
            return null;
        }
        
        return Accessor.admin(member.getMemberId());
    }

}
