<template>
    <div>
        
        <input type="checkbox" id="mobile-nav-toggle">
        <div class="mobile-menu-wrapper">
            
            <!-- menu -->
            <div class="mobile-menu">
                <label for="mobile-nav-toggle"></label>

                <div class="mobile-menu-inner">
                    <div class="menu-logo">
                        <img src="@/assets/img/tmlogo.png" width="70%" alt="">
                    </div>

                    <div class="menu-block main">
                        <ul>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="hand-right"></ion-icon> Partner With Us
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="cart"></ion-icon> Cart
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="notifications"></ion-icon> Notifications
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="information-circle"></ion-icon> About Us
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <header class="main-header">
            <div class="wrapper">
                <nav>
                    <label for="mobile-nav-toggle" class="menu-toggle-sm">
                        <ion-icon name="menu"></ion-icon>
                    </label>

                    <label for="" class="menu-toggle">
                        <ion-icon name="menu"></ion-icon>
                    </label>

                    <div>
                        <ul>
                            <li>
                                <router-link to="/" class="link-icon">
                                    <ion-icon name="cart-outline"></ion-icon>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-icon">
                                    <ion-icon name="notifications-outline"></ion-icon>
                                </router-link>
                            </li>
                            <li class="hide-sm">
                                <router-link to="/" class="link-text">About Us</router-link>
                            </li>
                            <li class="hide-sm">
                                <router-link to="/" class="link-btn">Partner With Us</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>