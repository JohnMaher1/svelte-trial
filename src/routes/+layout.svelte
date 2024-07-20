<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '../components/navbar.svelte';
</script>

<Navbar />

<ModeWatcher />
<slot />
