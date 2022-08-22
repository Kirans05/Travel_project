package com.merchant.api.util;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Random;

import net.bytebuddy.utility.RandomString;
public class ApplicationUtils {
	public static Date getLocalDate() {
		ZonedDateTime zdt = LocalDateTime.now().atZone(ZoneId.systemDefault());
		return Date.from(zdt.toInstant());

	}
	
	public static String genrateUserToken() {
		return RandomString.make(16);
	}
}
