(function () {

    //windowサイズを画面サイズに合わせる
    var width = window.innerWidth;
    var height = window.innerHeight;

    var element;
    var scene, camera, renderer, controls, texture;

    function init() {

        // シーンの作成
        scene = new THREE.Scene();

        // リサイズイベントを検知してリサイズ処理を実行
        window.addEventListener("resize", handleResize, false);

        // カメラの作成
        camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        camera.position.set(0, 0, 0.1);
        scene.add(camera);

        var geometry = new THREE.SphereGeometry(5, 60, 40);
        geometry.scale(-1, 1, 1);

        //　マテリアルの作成
        var material = new THREE.MeshBasicMaterial({
            // 画像をテクスチャーとして読み込み
            map: THREE.ImageUtils.loadTexture(
                "img/garage.jpg"
            )
        });

        // 球体(形状)にマテリアル(質感)を貼り付けて物体を作成
        sphere = new THREE.Mesh(geometry, material);

        //　シーンに追加
        scene.add(sphere);

        // レンダラーの作成
        renderer = new THREE.WebGLRenderer();
        // レンダラーをwindowサイズに合わせる
        renderer.setSize(width, height);
        renderer.setClearColor({color: 0x000000});
        element = renderer.domElement;
        document.getElementById("stage").appendChild(element);
        renderer.render(scene, camera);

        // パソコンの場合
        // マウスドラッグで視点操作を可能にする
        setOrbitControls();

        render();
    }

    // リサイズ処理
    function handleResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    function setOrbitControls() {
        // パソコン閲覧時マウスドラッグで視点操作する
        controls = new THREE.OrbitControls(camera, element);
        controls.target.set(
            camera.position.x + 0.15,
            camera.position.y,
            camera.position.z
        );
        // 視点操作のイージングをONにする
        controls.enableDamping = true;
        // 視点操作のイージングの値
        controls.dampingFactor = 0.1;
        // 視点変更の速さ
        controls.rotateSpeed = 0.03;

        controls.zoomSpeed=3.0;
        controls.minDistance=3;
        controls.maxDistance=5;
        // パン操作禁止
        controls.noPan = true;
    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.minDistance=3;
        controls.maxDistance=5;
        controls.update();
    }

    window.addEventListener("load", init, false);

})();