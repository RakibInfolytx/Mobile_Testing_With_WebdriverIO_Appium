describe('sample', () => {
    it('- Shorts app should be oppened', async() => {
        await driver.pause(5000);   
    })

    it('- Shorts video should be played', async() => {
        
        const entryPointThumbnail = await $('(//android.widget.ImageView[@content-desc="EntryPoint Thumbnail"])[1]');
        await entryPointThumbnail.click();
        await driver.pause(4000);
    })

    it('- Should verify interest categories with title "Choose your interests" is displayed after 4 videos', async() => {
        
        for (let i = 0; i < 4; i++) {

            await driver.pause(4000);

            const { height, width } = await driver.getWindowSize();

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.8 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, origin: 'viewport', x: width / 2, y: height * 0.2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            console.log(`Swiped up video ${i + 1} times`);
        }      
        
        await driver.pause(5000);

        const chooseYourInterestsText = await $('//android.widget.TextView[@text="Choose your interests"]');
        const isDisplayed = await chooseYourInterestsText.isDisplayed();

        if (isDisplayed) {
            console.log('The text "Choose your interests" is displayed on the page.');
        } else {
            console.log('The text "Choose your interests" is NOT displayed on the page.');
        }

        expect(isDisplayed).toBe(true);
    })
      
    it('should scroll up and down in the ScrollView', async () => {

        const { height, width } = await driver.getWindowSize();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.8 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 1000, origin: 'viewport', x: width / 2, y: height * 0.2 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        console.log('Scrolled down in the ScrollView');

        await driver.pause(3000);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.2 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 1000, origin: 'viewport', x: width / 2, y: height * 0.8 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        console.log('Scrolled up in the ScrollView');
    });
    
    it('should verify if specific elements in the ScrollView are selectable and functional', async () => {
       
        const elementXpaths = [
            '//android.widget.ScrollView/android.view.View[1]',
            '//android.widget.ScrollView/android.view.View[2]',
            '//android.widget.ScrollView/android.view.View[3]',
            '//android.widget.ScrollView/android.view.View[7]',
            '//android.widget.ScrollView/android.view.View[8]',
            '//android.widget.ScrollView/android.view.View[9]',
            '//android.widget.ScrollView/android.view.View[10]',
            '//android.widget.ScrollView/android.view.View[12]',
            '//android.widget.ScrollView/android.view.View[14]'
        ];

        for (let i = 0; i < elementXpaths.length; i++) {

            const element = await $(elementXpaths[i]);

            const isDisplayed = await element.isDisplayed();
            console.log(`Element at ${elementXpaths[i]} is displayed: ${isDisplayed}`);
            expect(isDisplayed).toBe(true);

            await element.click(); 

            console.log(`Tapped element at ${elementXpaths[i]}`);

            await driver.pause(1000);
        }
        
        const skipButton = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/androidx.compose.ui.viewinterop.ViewFactoryHolder/android.widget.FrameLayout/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View[7]/android.widget.Button')
        await skipButton.click();

    });
})