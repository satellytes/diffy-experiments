//export is easier then reading text files with ts or webpack

export const PATCH_DIFF = `
diff --git a/my.css b/my.css
index 49fc55a..0453b35 100644
--- a/my.css
+++ b/my.css
@@ -1,6 +1,10 @@
+html {
+  font-size: 16px; 
+}
+
+// magic number
 body {
-  background: #000000;
-  font-size:  12px;
+  background: #123456;
 }
 
 * {
@@ -16,10 +20,23 @@ body {
   outline: 2px solid green;
 }
 
-.paragraph {
-  font-size:  16px;
+// issue1: nesting
+body {
+  .product {
+    .product-imag {
+      .paragraph {
+        font-size:  1rem;
+      }
+    }
+  }
 }
 
-.layout {
+// over specifiy, creates the same issues as nesting actually
+body .product .product-image .layout {
   float: left;
-}
\\ No newline at end of file
+}
+
+// Issue: deadly specificity (!important)
+.product-image {
+  outline: 20px solid red !important;
+}
`
