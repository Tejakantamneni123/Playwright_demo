/**
 * Deloitte MAT Login Script - Chrome with Separate User Profile
 * This script launches Chrome with an isolated user profile
 * Simulates "Run as different user" in Chrome
 * 
 * Features:
 * - Separate Chrome user profile
 * - Automatic space trimming
 * - Extension support
 * - Persistent session
 */

import { chromium, BrowserContext, Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

// ============================================================
// CONFIGURATION
// ============================================================

interface Config {
    url: string;
    username: string;
    password: string;
    userDataDir: string;  // Chrome user profile directory
    headless: boolean;
    timeouts: {
        navigation: number;
        element: number;
        verification: number;
    };
    waits: {
        pageLoad: number;
        afterClick: number;
        afterLogin: number;
        browserOpen: number;
    };
}

const CONFIG: Config = {
    url: "https://qtopportalweb.aaps.deloitte.com/",
    username: "LEFAHTest1014@deloitte.com".trim(),  // Auto-trim spaces
    password: "NH@mA4g3$pn?qZF!".trim(),          // Auto-trim spaces
    userDataDir: path.join(__dirname, 'chrome-user-data', 'LEFAHTest1014'),
    headless: false,
    timeouts: {
        navigation: 30000,
        element: 10000,
        verification: 25000
    },
    waits: {
        pageLoad: 3000,
        afterClick: 2000,
        afterLogin: 12000,
        browserOpen: 30000
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Sleep/delay function
 */
const sleep = (ms: number): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Logger with timestamp
 */
const log = (message: string, icon: string = '📘'): void => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${icon} ${message}`);
};

/**
 * Ensure user data directory exists
 */
const ensureUserDataDir = (): void => {
    if (!fs.existsSync(CONFIG.userDataDir)) {
        fs.mkdirSync(CONFIG.userDataDir, { recursive: true });
        log(`Created user profile directory: ${CONFIG.userDataDir}`, '📁');
    } else {
        log(`Using existing user profile: ${CONFIG.userDataDir}`, '📁');
    }
};

// ============================================================
// MAIN LOGIN FUNCTION
// ============================================================

async function loginWithChromeProfile(): Promise<boolean> {
    let context: BrowserContext | null = null;
    
    try {
        // ========================================
        // STEP 1: Setup Chrome Profile
        // ========================================
        log('Setting up Chrome user profile...', '🔧');
        ensureUserDataDir();
        
        // ========================================
        // STEP 2: Launch Chrome with Persistent Context
        // ========================================
        log('Launching Chrome with separate user profile...', '🚀');
        
        context = await chromium.launchPersistentContext(CONFIG.userDataDir, {
            headless: CONFIG.headless,
            channel: 'chrome',  // Use actual Chrome instead of Chromium
            viewport: null,
            args: [
                '--start-maximized',
                '--disable-blink-features=AutomationControlled',
                '--no-first-run',
                '--no-default-browser-check'
            ]
        });
        
        log('Chrome launched successfully with isolated profile', '✅');
        
        // Get or create page
        const pages = context.pages();
        const page: Page = pages.length > 0 ? pages[0] : await context.newPage();
        page.setDefaultTimeout(CONFIG.timeouts.navigation);
        
        // ========================================
        // STEP 3: Navigate to Portal
        // ========================================
        log(`Navigating to ${CONFIG.url}`, '🌐');
        await page.goto(CONFIG.url, { waitUntil: 'domcontentloaded' });
        await sleep(CONFIG.waits.pageLoad);
        log('Page loaded successfully', '✅');
        
        // ========================================
        // STEP 4: Handle Cookie Banner
        // ========================================
        log('Handling cookie banner...', '🍪');
        try {
            await page.evaluate(() => {
                const closeBtn = document.querySelector('button.onetrust-close-btn-handler');
                if (closeBtn) (closeBtn as HTMLButtonElement).click();
            });
            await sleep(CONFIG.waits.afterClick);
            log('Cookie banner closed', '✅');
        } catch (e) {
            log('No cookie banner found', '📝');
        }
        
        // ========================================
        // STEP 5: Check for Existing Session
        // ========================================
        log('Checking session status...', '🔍');
        
        try {
            // Check if already logged in
            await page.waitForSelector('text=My Clients', { timeout: 3000 });
            log('Already logged in! Dashboard is accessible.', '✅');
            
            // Display current user if found
            try {
                const userInitial = await page.locator('div').filter({ 
                    hasText: /^[A-Z]{1,2}$/ 
                }).first().textContent({ timeout: 3000 });
                
                if (userInitial) {
                    log(`Current user: ${userInitial}`, '👤');
                }
            } catch (e) {
                // Couldn't get user initial
            }
            
            console.log('\n' + '='.repeat(60));
            console.log('🎉 ALREADY LOGGED IN - SESSION ACTIVE! 🎉');
            console.log('='.repeat(60));
            console.log(`📍 URL: ${page.url()}`);
            console.log(`📄 Title: ${await page.title()}`);
            console.log('='.repeat(60) + '\n');
            
            log(`Browser will remain open for ${CONFIG.waits.browserOpen / 1000}s`, '⏰');
            await sleep(CONFIG.waits.browserOpen);
            
            return true;
            
        } catch (e) {
            log('No active session. Proceeding with login...', '🔐');
        }
        
        // Check if user is logged in but different user
        try {
            await page.waitForSelector('div:has-text("PN"), div:has-text("M")', { 
                timeout: 3000 
            });
            
            log('Different user logged in. Logging out...', '⚠️');
            
            // Logout
            await page.locator('div').filter({ hasText: /^[A-Z]{1,2}$/ }).first().click();
            await sleep(CONFIG.waits.afterClick);
            
            await page.locator('div').filter({ hasText: 'Log out' }).last().click();
            await sleep(CONFIG.waits.pageLoad * 2);
            
            // Handle logout confirmation
            try {
                await page.locator('[data-test-id*="@deloitte.com"]').first().click({ 
                    timeout: 3000 
                });
                await sleep(CONFIG.waits.pageLoad);
            } catch (e) {
                // No confirmation
            }
            
            log('Logged out successfully', '✅');
        } catch (e) {
            log('No existing session found', '📝');
        }
        
        // ========================================
        // STEP 6: Handle Login Popup
        // ========================================
        log('Waiting for Microsoft login...', '⏳');
        await sleep(CONFIG.waits.pageLoad);
        
        const allPages = context.pages();
        let loginPage: Page = page;
        
        if (allPages.length > 1) {
            log(`Multiple tabs detected (${allPages.length}). Using login tab...`, '📑');
            loginPage = allPages[allPages.length - 1];
        }
        
        // ========================================
        // STEP 7: Check for "Use another account"
        // ========================================
        log('Checking login page...', '🔍');
        
        try {
            const useAnotherAccount = await loginPage.getByRole('button', { 
                name: 'Use another account' 
            }).isVisible({ timeout: 3000 });
            
            if (useAnotherAccount) {
                log('Clicking "Use another account"...', '🔑');
                await loginPage.getByRole('button', { 
                    name: 'Use another account' 
                }).click();
                await sleep(CONFIG.waits.pageLoad);
            }
        } catch (e) {
            // No "Use another account" button, continue
        }
        
        // ========================================
        // STEP 8: Enter Username
        // ========================================
        log('Entering username...', '📧');
        
        // Wait for email field with longer timeout
        await loginPage.waitForSelector(
            'input[type="email"], input[name="loginfmt"]',
            { timeout: CONFIG.timeouts.element * 2 }
        );
        
        // Fill username (trimmed)
        log(`Username: ${CONFIG.username}`, '✅');
        const usernameField = loginPage.locator(
            'input[type="email"], input[name="loginfmt"]'
        ).first();
        await usernameField.clear();
        await usernameField.fill(CONFIG.username);
        await sleep(CONFIG.waits.afterClick);
        
        // Click Next
        log('Clicking Next...', '➡️');
        await loginPage.getByRole('button', { name: 'Next' }).click();
        await sleep(CONFIG.waits.pageLoad);
        
        // ========================================
        // STEP 9: Enter Password
        // ========================================
        log('Entering password...', '🔒');
        
        await loginPage.waitForSelector('input[type="password"]', { 
            timeout: CONFIG.timeouts.element 
        });
        
        // Fill password (trimmed)
        const passwordField = loginPage.locator('input[type="password"]').first();
        await passwordField.clear();
        await passwordField.fill(CONFIG.password);
        await sleep(CONFIG.waits.afterClick);
        
        // Click Sign in
        log('Signing in...', '✅');
        await loginPage.getByRole('button', { name: 'Sign in' }).click();
        
        // ========================================
        // STEP 10: Handle "Stay signed in?"
        // ========================================
        log('Processing Microsoft authentication...', '⏳');
        try {
            const staySignedIn = await loginPage.getByRole('button', { 
                name: 'Yes' 
            }).isVisible({ timeout: 5000 });
            
            if (staySignedIn) {
                log('Accepting "Stay signed in?" prompt', '✅');
                await loginPage.getByRole('button', { name: 'Yes' }).click();
                await sleep(CONFIG.waits.afterClick);
            }
        } catch (e) {
            // No prompt
        }
        
        await sleep(CONFIG.waits.afterLogin);
        
        // ========================================
        // STEP 11: Verify Login
        // ========================================
        log('Verifying login success...', '🔍');
        let loginSuccessful = false;
        
        // Method 1: Check for My Clients
        try {
            await page.waitForSelector('text=My Clients', { 
                timeout: CONFIG.timeouts.verification 
            });
            loginSuccessful = true;
            log('Verification: "My Clients" found', '✅');
        } catch (e) {
            log('Primary verification failed, trying alternatives...', '⚠️');
            
            // Method 2: Check user profile
            try {
                const userInitial = await page.locator('div').filter({ 
                    hasText: /^[A-Z]{1,2}$/ 
                }).first().textContent({ timeout: 5000 });
                
                if (userInitial) {
                    loginSuccessful = true;
                    log(`Verification: User profile "${userInitial}" found`, '✅');
                }
            } catch (e) {
                // Method 3: Check URL
                if (page.url().includes('dnxmatglobal.aaps.deloitte.com') && 
                    !page.url().includes('login.microsoftonline.com')) {
                    loginSuccessful = true;
                    log('Verification: On portal page', '✅');
                }
            }
        }
        
        // ========================================
        // STEP 12: Display Results
        // ========================================
        if (loginSuccessful) {
            console.log('\n' + '='.repeat(60));
            console.log('🎉 LOGIN SUCCESSFUL! 🎉');
            console.log('='.repeat(60));
            console.log(`📍 URL: ${page.url()}`);
            console.log(`📄 Title: ${await page.title()}`);
            console.log(`👤 User: ${CONFIG.username}`);
            console.log(`💾 Profile: ${CONFIG.userDataDir}`);
            
            // Try to get client count
            try {
                const clientCount = await page.locator('text=/My Clients/')
                    .locator('..')
                    .locator('div')
                    .filter({ hasText: /^\d+$/ })
                    .first()
                    .textContent({ timeout: 3000 });
                    
                if (clientCount) {
                    console.log(`📊 Clients: ${clientCount}`);
                }
            } catch (e) {
                // Not available
            }
            
            console.log('='.repeat(60));
            console.log('💡 Note: Session saved in Chrome profile');
            console.log('   Next run will resume this session automatically!');
            console.log('='.repeat(60) + '\n');
            
            log(`Browser will remain open for ${CONFIG.waits.browserOpen / 1000}s`, '⏰');
            await sleep(CONFIG.waits.browserOpen);
            
            return true;
        } else {
            log('Login verification failed', '❌');
            console.log(`\nCurrent URL: ${page.url()}`);
            console.log('Please verify manually\n');
            await sleep(60000);
            return false;
        }
        
    } catch (error) {
        const err = error as Error;
        log(`ERROR: ${err.message}`, '❌');
        console.error('\nStack trace:');
        console.error(err.stack);
        
        if (context) {
            log('Keeping browser open for 60s for debugging...', '⚠️');
            await sleep(60000);
        }
        
        return false;
        
    } finally {
        if (context) {
            log('Closing browser...', '🔚');
            await context.close();
            log('Browser closed. Profile saved.', '✅');
        }
    }
}

// ============================================================
// MAIN EXECUTION
// ============================================================

(async (): Promise<void> => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 DELOITTE MAT - CHROME LOGIN (SEPARATE USER)');
    console.log('='.repeat(60));
    console.log(`📧 Username: ${CONFIG.username}`);
    console.log(`🌐 URL: ${CONFIG.url}`);
    console.log(`💾 Chrome Profile: ${CONFIG.userDataDir}`);
    console.log(`👁️  Headless: ${CONFIG.headless ? 'ON' : 'OFF'}`);
    console.log('='.repeat(60) + '\n');
    
    const startTime = Date.now();
    
    try {
        const success = await loginWithChromeProfile();
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        
        if (success) {
            console.log('\n' + '='.repeat(60));
            console.log(`✅ Script completed successfully in ${duration}s`);
            console.log('='.repeat(60) + '\n');
            process.exit(0);
        } else {
            console.log('\n' + '='.repeat(60));
            console.log(`❌ Login failed after ${duration}s`);
            console.log('='.repeat(60) + '\n');
            process.exit(1);
        }
    } catch (error) {
        const err = error as Error;
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.error('\n' + '='.repeat(60));
        console.error(`❌ Script crashed after ${duration}s`);
        console.error(`Error: ${err.message}`);
        console.error('='.repeat(60) + '\n');
        process.exit(1);
    }
})();

