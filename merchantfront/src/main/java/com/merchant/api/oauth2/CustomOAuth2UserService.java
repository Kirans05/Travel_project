package com.merchant.api.oauth2;
import com.merchant.api.exception.OAuth2AuthenticationProcessingException;
import com.merchant.api.model.AuthProvider;
import com.merchant.api.model.User;
import com.merchant.api.repository.UserRepository;
import com.merchant.api.security.UserPrincipal;
import com.merchant.api.security.oath2.user.OAuth2UserInfo;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService{
	@Autowired
    private UserRepository userRepository;
	 
	
	@Value("${app.api.host}")
	private String apiUrl;
	
	 @Override
	    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
	        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

	        try {
	            return processOAuth2User(oAuth2UserRequest, oAuth2User);
	        } catch (AuthenticationException ex) {
	            throw ex;
	        } catch (Exception ex) {
	            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
	            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
	        }
	    }

	    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
	    	log.info(" *********** THIS SHOULD NOT BE CALLED *********** ");
	        return null;
	    }

	    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
	        User user = new User();

	        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
	        user.setProviderId(oAuth2UserInfo.getId());
	        user.setFirstName(oAuth2UserInfo.getFirstName());
	        user.setLastName(oAuth2UserInfo.getLastName());
	        user.setEmail(oAuth2UserInfo.getEmail()); 
	        user.setActive(Boolean.FALSE);	        
	        return userRepository.save(user);
	    }

	    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
	    	existingUser.setFirstName(oAuth2UserInfo.getFirstName());
	    	existingUser.setLastName(oAuth2UserInfo.getLastName());	        
	        return userRepository.save(existingUser);
	    }
}
