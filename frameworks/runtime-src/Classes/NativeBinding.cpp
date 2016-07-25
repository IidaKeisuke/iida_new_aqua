//
//  NativeBinding.cpp
//  AsukaZeroTrump
//
//  Created by 森田修康 on 2016/06/09.
//
//

#include "NativeBinding.h"

#include "cocos2d.h"

USING_NS_CC;

void js_register_native_binding(JSContext* cx, JS::HandleObject object)
{
    JS::RootedObject native(cx, JS_NewObject(cx, NULL, JS::NullPtr(), JS::NullPtr()));
    JS::RootedValue nativeVal(cx);
    nativeVal = OBJECT_TO_JSVAL(native);
    JS_SetProperty(cx, object, "native", nativeVal);
    
    // ここより下に JS_DefineFunction を追加していく
}
