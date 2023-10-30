package com.sww.ddorangddorang.global.config;

import org.opencv.core.Core;
import org.opencv.osgi.OpenCVNativeLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenCVConfig {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    @Bean
    public OpenCVNativeLoader openCVLoader() {
        return new OpenCVNativeLoader();
    }
}