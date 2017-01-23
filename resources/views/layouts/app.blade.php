<html>
    <head>
        <title>@yield('title')</title>

        <link rel="stylesheet" type="text/css" href="css/app.css">
    </head>
    <body>

        <div id="app">

            <nav-header :active-page="activePage"></nav-header>

            @yield('content')

        </div>

    </body>

    <script>
      window.Laravel = <?php echo json_encode([
        'csrfToken' => csrf_token(),
      ]); ?>
    </script>

    <script src="js/app.js"></script>

</html>