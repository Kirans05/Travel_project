package com.merchant.api.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {
	private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();
    
    
    public static class Auth {
        private String tokenSecret;
		private long tokenExpirationMsec;
		
        public String getTokenSecret() {
			return tokenSecret;
		}
		public void setTokenSecret(String tokenSecret) {
			this.tokenSecret = tokenSecret;
		}
		public long getTokenExpirationMsec() {
			return tokenExpirationMsec;
		}
		public void setTokenExpirationMsec(long tokenExpirationMsec) {
			this.tokenExpirationMsec = tokenExpirationMsec;
		}
    }
    
    
    public static final class OAuth2 {
        private List<String> authorizedRedirectUris = new ArrayList<String>();

		public List<String> getAuthorizedRedirectUris() {
			return authorizedRedirectUris;
		}

		public void setAuthorizedRedirectUris(List<String> authorizedRedirectUris) {
			this.authorizedRedirectUris = authorizedRedirectUris;
		}
    }
}
