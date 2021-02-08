//= require ../lib/_jquery

(function () {
  "use strict";

  $(document).ready(function () {
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    if (getCookie("next-auth.session-token")) {
      $("body").addClass("signed-in");
    } else {
      $("body").addClass("signed-out");
    }

    const isDevelopment =
      window.location.href.includes("localhost") ||
      window.location.href.includes("127.0.0.1");

    const projectAPIKey = !isDevelopment
      ? null
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWZlMmVlZjI1MzgwNjRhMjJkNDk2YiIsInVzZXJJZCI6IjYwMWZjYmNkNDU0ZmFhNWJlMWQzNmNmNiIsImlhdCI6MTYxMjcwMjQ0Nn0.rBg1t3-LUOcMTFpkyZ0IRHfK69XHd-4o0USyml44K08";

    //replace api keys
    if (projectAPIKey) {
      document.querySelectorAll(".highlight code").forEach(function (el) {
        el.innerHTML = el.innerHTML.replace(/API_KEY/gi, projectAPIKey);
      });
    }

    if (isDevelopment) {
      document.querySelectorAll(".highlight code").forEach(function (el) {
        el.innerHTML = el.innerHTML.replace(
          /https:\/\/moderationapi.com/gi,
          "http://localhost:3000"
        );
      });
    }
  });
})();
