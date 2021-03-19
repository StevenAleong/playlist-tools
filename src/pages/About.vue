<template>
    <Block class="mb-3">
        <h2>Information about this tool</h2>
        <p>
            This app was created because of the limitations that I was running into from the website version found at 
            <a href="https://stevenaleong.com/tools/spotifyplaylistrandomizer" target="_blank">https://stevenaleong.com/tools/spotifyplaylistrandomizer</a>.
        </p>  
        <p>
            I was asked multiple times if there was a way to schedule the shuffling among other
            features that I could not implement into the tool without rebuilding it with all these
            requests in mind.
        </p>
        <p>
            This gave me an excuse to learn new technologies. This tool was built using VueJS and styled with TailWindCSS.
        </p>
        <p>
            I didn't do the mobile responsiveness yet so it wont look great on that.
        </p>
    </Block>
    <Block class="mb-3">
        <h2>Contact Me</h2>
        <p>
            Email: <a href="mailto:stevenaleong@outlook.com" target="_blank">stevenaleong@outlook.com</a><br />
            Website: <a href="https://stevenaleong.com" target="_blank">stevenaleong.com</a><br />
            Github: <a href="https://github.com/StevenAleong" target="_blank">https://github.com/StevenAleong</a>
        </p>
    </Block>
    <Block class="mb-3">
        <h2>Support</h2>
        <p>
            I didn't build this app to sell. I built it because I was running into frustrations of Spotify. I got asked
            once by someone if they could send some money to me which I honestly never expected. I just wanted to share the
            tool that was originally created. I'm just happy people are using the tools and are letting me know! I do run 
            ads on the pages but they ain't doing that much.
        </p>
        <p>
            I always love hearing from the people who are using it and just like seeing the messages left but if you're 
            still feeling generous, please buy me a donut or a coffee. Always a surprise and is appreciated.
        </p>
        <p>
            PayPal: <a href="https://paypal.me/StevenAleong" target="_blank">https://paypal.me/StevenAleong</a>
        </p>
    </Block>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'About'
    })
</script>

<style>
    
</style>